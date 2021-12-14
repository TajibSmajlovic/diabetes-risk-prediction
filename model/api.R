model_1 <- readRDS("model_1.rds")

#* Returns whether or not you would be diagnosed with the diabetes
#* @param gender Gender 
#* @param age Age 
#* @param polyuria Polyuria 
#* @param polydipsia Polydipsia 
#* @param polyphagia Polyphagia 
#* @param alopecia Alopecia 
#* @param obesity Obesity 
#* @param sudden_weight_loss Sudden weight loss 
#* @param visual_blurring Visual bluring
#* @param partial_paresis Partial Paresis
#* @param genital_thrush Genital thrush
#* @param itching Itching
#* @param irritability Irritability 
#* @param weakness Weakness
#* @param delayed_healing Delayed healing 
#* @param muscle_stiffness Muscle stiffnes
#* @post /diabetes-diagnosis
function(gender, age, polyuria, polydipsia, polyphagia, 
         alopecia, obesity, sudden_weight_loss, visual_blurring, 
         partial_paresis, genital_thrush, itching, irritability, 
         weakness, delayed_healing, muscle_stiffness) {
  
  # print(gender)
  # print(age)
  # print(polyuria)
  # print(polydipsia)
  # print(alopecia)
  # print(obesity)
  # print(sudden_weight_loss)
  # print(visual_blurring)
  # print(partial_paresis)
  # print(genital_thrush)
  # print(itching)
  # print(irritability)
  # print(weakness)
  # print(delayed_healing)
  # print(muscle_stiffness)
  
  new_data <- data.frame(as.numeric(gender), as.numeric(age), as.numeric(polyuria), as.numeric(polydipsia), as.numeric(polyphagia), 
                     as.numeric(alopecia), as.numeric(obesity), as.numeric(sudden_weight_loss), as.numeric(visual_blurring), 
                     as.numeric(partial_paresis), as.numeric(genital_thrush), as.numeric(itching), as.numeric(irritability), 
                     as.numeric(weakness), as.numeric(delayed_healing), as.numeric(muscle_stiffness))
  
  colnames(new_data) <- c("gender", "age", "polyuria", "polydipsia", "polyphagia", "alopecia", "obesity", 
                          "sudden_weight_loss", "visual_blurring", "partial_paresis", "genital_thrush", 
                          "itching", "irritability", "weakness","delayed_healing","muscle_stiffness")
  
  predicted_result <- predict(model_1, new_data, type = "response")
 
  return(predicted_result > 0.4)
}

