Here's the closing bracket for the motion.div and the rest of the component:

```jsx
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    
                    {/* Benefits list */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                            <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Process steps */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Process:</h4>
                      <div className="space-y-2">
                        {service.process.map((step, i) => (
                          <div key={i} className="flex items-center">
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-sm mr-3`}>
                              {i + 1}
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-700 via-teal-700 to-purple-700 hover:from-blue-800 hover:via-teal-800 hover:to-purple-800 dark:from-blue-600 dark:via-teal-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:via-teal-700 dark:hover:to-purple-700 text-white">
              <Link to="/contact">
                <Coffee className="mr-2 h-4 w-4" />
                Let's Discuss Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>
    </>
  );
};
```
                    