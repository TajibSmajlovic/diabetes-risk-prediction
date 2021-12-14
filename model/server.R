if (!require("plumber")) install.packages("plumber")
if (!require("jsonlite")) install.packages("jsonlite")

library("plumber")
library("jsonlite")

api <- plumb("api.R")

swagger_file <- api$swaggerFile()
swagger_file$info$title <- "Diabetes risk prediction"
swagger_file$description <- "todo"
swagger_file$info$version <- "0.1"
swagger <- toJSON(swagger_file, pretty = T, auto_unbox = T)
cat(swagger, file = "server-swagger.json", append = F)

api$run(port = 5000)
