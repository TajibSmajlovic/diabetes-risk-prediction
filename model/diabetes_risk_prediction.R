setwd("C:\\Users\\TajibPC\\Documents\\Tajib\\IUS\\Master\\Graduation_Project\\model")

data <- read.csv("diabetes_data.csv")
#View(data)
str(data)

## Data Pre-processing ##

gender <- ifelse(data$Gender == "Female", as.integer(0), as.integer(1))
age <- data$Age
polyuria <- ifelse(data$Polyuria == "No", as.integer(0), as.integer(1))
polydipsia <- ifelse(data$Polydipsia == "No", as.integer(0), as.integer(1))
polyphagia <- ifelse(data$Polyphagia == "No", as.integer(0), as.integer(1))
alopecia <- ifelse(data$Alopecia == "No", as.integer(0), as.integer(1))
obesity <- ifelse(data$Obesity == "No", as.integer(0), as.integer(1))
partial_paresis <- ifelse(data$partial.paresis == "No", as.integer(0), as.integer(1))
genital_thrush <- ifelse(data$Genital.thrush == "No", as.integer(0), as.integer(1))
sudden_weight_loss <- ifelse(data$sudden.weight.loss == "No", as.integer(0), as.integer(1))
visual_blurring <- ifelse(data$visual.blurring == "No", as.integer(0), as.integer(1))
itching <- ifelse(data$Itching == "No", as.integer(0), as.integer(1))
irritability <- ifelse(data$Irritability == "No", as.integer(0), as.integer(1))
delayed_healing <- ifelse(data$delayed.healing == "No", as.integer(0), as.integer(1))
muscle_stiffness <- ifelse(data$muscle.stiffness == "No", as.integer(0), as.integer(1))
weakness <- ifelse(data$weakness == "No", as.integer(0), as.integer(1))
diagnosis_result <- ifelse(data$class == "Negative", as.integer(0), as.integer(1))

processed_data <- data.frame(gender, age, polyuria, polydipsia, polyphagia, 
                             alopecia, obesity, sudden_weight_loss, visual_blurring, 
                             partial_paresis, genital_thrush, itching, irritability, 
                             weakness, delayed_healing, muscle_stiffness, diagnosis_result)
str(processed_data)
#View(processed_data)

## Logistics regression
library(caTools)

set.seed(1444)
split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)

model_1 <- glm(formula = as.numeric(diagnosis_result == 1) ~ ., family = "binomial", data = train)
summary(model_1)

saveRDS(model_1, "model_1.rds")

results <- predict(model_1, test, type = "response")
table(test$diagnosis_result, results > 0.4)

# Accuracy
(45 + 75) / (45 + 5 +5 + 75) # -> 0.923%

# Sensitivity
45 / (45 +5) # -> 90%

# Specificity
75 / (75 + 5) # -> 93%


# KNN
library("class")

set.seed(1555)
split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)



# Random forest
library("randomForest")
library(caTools)

set.seed(1666)
split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)
