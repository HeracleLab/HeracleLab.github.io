### this is the analysis of one person's data

datafilename = "search.psy.2012-12-13-1154.data"

### read data into table

data         = read.table( datafilename )
correct      = data[,5]==1 # flag correct trial
n            = dim(data)[1]  # number of trials
items        = data[,4]
rt           = data[,6]
present      = data[,3] == 1

### now report average response times in correct trials

print("Search time in milliseconds")
print("5 items")
print( mean( rt[ items ==  5 & present & correct ] ))
print( mean( rt[ items == 10 & present & correct ] ))
print( mean( rt[ items == 15 & present & correct ] ))
print( mean( rt[ items == 20 & present & correct ] ))


plot( items[ correct & present ] , rt[ correct & present ] , pch=19 , col="red" , las=1 )
abline( glm( rt[ correct & present ] ~ items[ correct & present ] ) )
title("Search times and search slope")
