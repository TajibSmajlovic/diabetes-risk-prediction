setwd("C:\\Users\\TajibPC\\OneDrive\\Graduation_Project\\model")

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

by_weakness <-table(processed_data$weakness, processed_data$diagnosis_result)
rownames(by_weakness) <- c('Has weaknes','No weakness')
colnames(by_weakness) <- c("Non-diabetic", 'Diabetic')

table(processed_data$sudden_weight_loss, processed_data$diagnosis_result)


weakness <- processed_data[processed_data$weakness == 1, ]
by_weakness <- table(weakness$diagnosis_result)
rownames(by_weakness) <- c("Non-diabetic", 'Diabetic')


barplot(by_weakness,
        main="Diabetic and non-diabetic patients",
        col=c("#50C878","#D70040"),
        #legend = c("Non-diabetic", "Diabetic"),
        #args.legend = list(x = "topright", bty = "n", inset=c(0, -0.1)),
        beside=TRUE)


weight_loss <- processed_data[processed_data$sudden_weight_loss == 1, ]
by_weight_loss <- table(weight_loss$diagnosis_result)
rownames(by_weight_loss) <- c("Non-diabetic", 'Diabetic')

barplot(by_weight_loss,
        main="Diabetic and non-diabetic patients",
        col=c("#50C878","#D70040"),
        #legend = c("Non-diabetic", "Diabetic"),
        #args.legend = list(x = "topright", bty = "n", inset=c(0, -0.1)),
        beside=TRUE)

partial_paresis <- processed_data[processed_data$partial_paresis == 1, ]
by_partial_paresis <- table(partial_paresis$diagnosis_result)
rownames(by_partial_paresis) <- c("Non-diabetic", 'Diabetic')


delayed_healing <- processed_data[processed_data$delayed_healing == 1, ]
by_delayed_healing <- table(delayed_healing$diagnosis_result)
rownames(by_delayed_healing) <- c("Non-diabetic", 'Diabetic')



by_diagnosis <- table(processed_data$diagnosis_result)
rownames(by_diagnosis) <- c("Non-diabetic", "Diabetic")

barplot(by_diagnosis,
        main="Diabetic and non-diabetic patients",
        col=c("#50C878","#D70040"),
        #legend = c("Non-diabetic", "Diabetic"),
        #args.legend = list(x = "topright", bty = "n", inset=c(0, -0.1)),
        beside=TRUE)


by_gender <- table(processed_data$gender, processed_data$diagnosis_result)

rownames(by_gender) <- c("Female", 'Male')
colnames(by_gender) <- c("Negative", 'Positive')

barplot(by_gender,
        main="Diabetic and non-diabetic patients by gender",
        col=c("#FF69B4","#42C0FB"),
        legend = c("Female", "Male"),
        args.legend = list(x = "topright", bty = "n", inset=c(0, -0.1)),
        beside=TRUE)


by_obesity <- table(processed_data$obesity, processed_data$diagnosis_result)
colnames(by_obesity) <- c("Negative", 'Positive')

barplot(by_obesity,
        main="Diabetic and non-diabetic patients by obesity",
        col=c("#50C878","#D70040"),
        legend = c("Non-obese", "Obese"),
        args.legend = list(x = "topright", bty = "n", inset=c(0, -0.1)),
        beside=TRUE)


## Logistics regression
library(caTools)

set.seed(1444)
split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)

str(test)

model_1 <- glm(formula = as.numeric(diagnosis_result == 1) ~ ., family = "binomial", data = train)
summary(model_1)

saveRDS(model_1, "model_1.rds")

results <- predict(model_1, test, type = "response")
table(test$diagnosis_result, results > 0.4)

# Accuracy
(45 + 75) / (45 + 5 + 5 + 75) # -> 0.923%

# Sensitivity
45 / (45 + 5) # -> 90%

# Specificity
75 / (75 + 5) # -> 93%


# KNN
library(caTools)
library(class)

set.seed(1555)

split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)

model_knn <- knn(
  train = train[, -(ncol(train))],
  test = test[, -(ncol(test))],
  cl = train[, ncol(train)],
  k = 5)


table(test[, ncol(test)], model_knn)

# Accuracy
 # -> 0.8 | 80%

# Sensitivity
 # -> 0.6765 | 67%

# Specificity
# -> 0.9355 | 93%


# Decision tree --> will be used also!
library(caTools)
library(rpart)

set.seed(1666)

split <- sample.split(processed_data$diagnosis_result, 0.75)
train <- subset(processed_data, split == T)
test <- subset(processed_data, split == F)

classifier <- rpart(
  formula = diagnosis_result ~ .,
  data = train
)

plot(classifier)
text(classifier)

predicted <- predict(classifier, newdata = test)

predicted > 0.4

table(test$diagnosis_result, predicted > 0.4)

# 90% acc
# 97% sensitivity
# 86% 
