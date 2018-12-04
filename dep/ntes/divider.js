div12 = df[column].quantile(0.2)
div23 = df[column].quantile(0.4)
div34 = df[column].quantile(0.6)
div45 = df[column].quantile(0.8)


df.loc[df[column] <= div12,newColumn] = 1
df.loc[(df[column]>=div12)&(df[column] < div23),newColumn] = 2
df.loc[(df[column] >= div23) &(df[column]<div34 ),newColumn] = 3
df.loc[(df[column] >= div34)&(df[column]<div45),newColumn] = 4
df.loc[df[column] >= div45,newColumn] = 5

print(df[newColumn].unique())
print(df[newColumn].value_counts())