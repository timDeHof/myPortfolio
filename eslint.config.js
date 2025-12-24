import antfu from '@antfu/eslint-config'

export default antfu(
  {
		type: "app",
    react: true,
		typescript: true,
		formatters: true,
		stylistic: {
			indent: 2,
			semi: true,
			quotes: "double",
		},
		ignores: ["**/migrations/*","*.config.***", "**/dist/**", "**/node_modules/**", "**/.nuxt/**", "**/.output/**", "**/coverage/**", "**/public/**"],
	},
	{
		rules: {
		"ts/no-redeclare": "off",
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
			"perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
			"unicorn/filename-case": [
				"error",
				{
					case: "kebabCase",
					ignore: ["README.md", "App.tsx"],
				},
			],
		},
	},
)
