
labels = []
values = []
null_columns = titanic.columns[titanic.isnull().any()]
for col in null_columns:
    labels.append(col)
    values.append(titanic[col].isnull().sum())


for testData


from sklearn.ensemble import RandomForestRegressor
from sklearn.cross_validation import KFold
kf = KFold(testData.shape[0], n_folds=3, random_state=1)
predictors_columns = [ "mainPowerNetIn", "mainPowerOut","mainPowerIn", "netIn", "moneyOut",
              "moneyIn","changeRate", "priceChange"]

target="priceChangeCate"
alg = RandomForestRegressor(n_estimators=2000, n_jobs=-1)
predictions = []

for train, test in kf:
    train_predictors_columns = (testData[predictors_columns].iloc[train,:])
    train_target_columns = testData[target].iloc[train]
    alg.fit(train_predictors_columns, train_target_columns)
    
    #预测结果
    test_predictions_columns = alg.predict(testData[predictors_columns].iloc[test,:])
    predictions.append(test_predictions_columns)


predictions = np.concatenate(predictions, axis=0)
# Map predictions to outcomes (only possible outcomes are 1 and 0)
predictions[predictions > .5] = 1
predictions[predictions <=.5] = 0

#问题是现在对应不上把。。。predictor是哪个item的？
predictions


accuracy=sum(titanic["Survived"]==predictions)/len(titanic["Survived"])
accuracy



