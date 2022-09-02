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
  

   print(age)
   print(polyuria)
   print(polydipsia)
   print(alopecia)
   print(obesity)
   print(sudden_weight_loss)
   print(visual_blurring)
   print(partial_paresis)
   print(genital_thrush)
   print(itching)
   print(irritability)
   print(weakness)
   print(delayed_healing)
   print(muscle_stiffness)
  
  new_data <- data.frame(as.integer(gender), as.integer(age), as.integer(polyuria), as.integer(polydipsia), as.integer(polyphagia), 
                         as.integer(alopecia), as.integer(obesity), as.integer(sudden_weight_loss), as.integer(visual_blurring), 
                         as.integer(partial_paresis), as.integer(genital_thrush), as.integer(itching), as.integer(irritability), 
                         as.integer(weakness), as.integer(delayed_healing), as.integer(muscle_stiffness))
  
  colnames(new_data) <- c("gender", "age", "polyuria", "polydipsia", "polyphagia", "alopecia", "obesity", 
                          "sudden_weight_loss", "visual_blurring", "partial_paresis", "genital_thrush", 
                          "itching", "irritability", "weakness","delayed_healing","muscle_stiffness")
  
  predicted_result <- predict(model_1, new_data, type = "response")
  
  print(predicted_result)
  print("test")
  
  return(predicted_result > 0.4)
}

