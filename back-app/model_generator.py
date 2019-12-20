# Import libraries
import pandas as pd
from sklearn.preprocessing import Imputer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, accuracy_score
import numpy as np
from sklearn.externals import joblib



# Get the dataset
base = pd.read_csv('/home/vinicius/Documents/IA/Python/credit_data1.csv')
base.loc[base.idade < 0, 'idade'] = 40.92
               
previsores = base.iloc[:, 1:4].values
classe = base.iloc[:, 4].values

imputer = Imputer(missing_values = 'NaN', strategy = 'mean', axis = 0)
imputer = imputer.fit(previsores[:, 1:4])
previsores[:, 1:4] = imputer.transform(previsores[:, 1:4])

# Split the dataset into training (75%) and testing (25%) data
previsores_treinamento, previsores_teste, classe_treinamento, classe_teste = train_test_split(
previsores, classe, test_size=0.25, random_state=0)

# Build the classifier and make prediction
classificador = RandomForestClassifier(n_estimators=40, criterion='entropy', random_state=0)
classificador.fit(previsores_treinamento, classe_treinamento)
previsoes = classificador.predict(previsores_teste)


# Confusion matrix
precisao = accuracy_score(classe_teste, previsoes)
matriz = confusion_matrix(classe_teste, previsoes)


# Save the model to disk
joblib.dump(classificador, 'classifier.joblib')