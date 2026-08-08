import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards the RFC 9727 API catalog served at /.well-known/api-catalog.
 * https://www.rfc-editor.org/rfc/rfc9727
 *
 * These assertions cover the document's shape only. Whether Cloudflare actually
 * serves it as application/linkset+json can only be proven by a request against
 * `wrangler dev` or the deployed site.
 */

const CATALOG_PATH = resolve(__dirname, "../public/.well-known/api-catalog");
const HEADERS_PATH = resolve(__dirname, "../public/_headers");
const MEDIA_TYPE = "application/linkset+json";

interface Link {
  href: string;
  type?: string;
  title?: string;
}

type LinksetEntry = { anchor: string } & Record<string, unknown>;

const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8")) as { linkset: LinksetEntry[] };
const headers = readFileSync(HEADERS_PATH, "utf8");

function linksFor(entry: LinksetEntry, relation: string): Link[] {
  return entry[relation] as Link[];
}

describe("api catalog document", () => {
  it("has a non-empty linkset array", () => {
    expect(Array.isArray(catalog.linkset)).toBe(true);
    expect(catalog.linkset.length).toBeGreaterThan(0);
  });

  it.each(catalog.linkset.map((entry, index) => [index, entry] as const))(
    "entry %i is a valid API description",
    (_index, entry) => {
      expect(typeof entry.anchor).toBe("string");
      expect(new URL(entry.anchor).protocol).toBe("https:");

      // service-desc and service-doc are required by the task; status is optional
      // but we publish it, so hold the line on all three.
      for (const relation of ["service-desc", "service-doc", "status"]) {
        const links = linksFor(entry, relation);

        expect(Array.isArray(links), `${relation} must be an array`).toBe(true);
        expect(links.length).toBeGreaterThan(0);

        for (const link of links) {
          expect(typeof link.href).toBe("string");
          expect(typeof link.type).toBe("string");
          expect(new URL(link.href).protocol).toBe("https:");
        }
      }
    },
  );

  it.each(catalog.linkset.map((entry, index) => [index, entry] as const))(
    "entry %i keeps every href on the anchor's origin",
    (_index, entry) => {
      // Catches a partial edit when the API host is swapped to a custom domain.
      const { origin } = new URL(entry.anchor);
      const relations = ["service-desc", "service-doc", "status"];
      const hrefs = relations.flatMap(relation => linksFor(entry, relation) ?? []).map(link => link.href);

      for (const href of hrefs) {
        expect(new URL(href).origin).toBe(origin);
      }
    },
  );
});

describe("api catalog _headers rule", () => {
  it("serves the catalog as application/linkset+json", () => {
    const rule = headers
      .split(/\n(?=\S)/)
      .find(block => block.startsWith("/.well-known/api-catalog"));

    expect(rule, "public/_headers is missing a /.well-known/api-catalog block").toBeDefined();
    // Bare media type: a profile parameter is an RFC "SHOULD" and risks tripping
    // validators that compare the Content-Type exactly.
    expect(rule).toContain(`Content-Type: ${MEDIA_TYPE}\n`);
  });
});
