### this file might be difficult to understand. It is used to create
### stimuli for the visual search experiment. In principle, there are
### different ways to set these stimuli randomly, but this is the best
### way.

### the point is to have trials with a T (target present) and without
### a T (target absent).

# a stimulus can be at 1 out of 25 positions in a 5x5 grid.  Each
# position is coded in a table

# NOTE: targets will never be presented at screen center (position
# 13), because that might be too easy...

minsetsize = 5
maxsetsize = 20

### positiontable codes x,y positions of each of the 25 grid positions

positiontable = cbind( rep( -2:2 , 5 ), rep( -2:2 , each=5 ))
colnames(positiontable)=c("x","y")

### function to save the files into output for the PsyToolkit table

printstimuli=function( stimuli,positions )
{
 positiontablex = positiontable * 50 ### put the positions in pixed coordinates suitable for a 800x600 screen
 l = length(stimuli)
 for(i in 1:l )
   cat( stimuli[i] , positiontablex[ positions[i] , 1 ] , positiontablex[ positions[i] , 2 ] , " ")
}

### function to print dummy stimuli. These are merely used to make
### sure each line in the table has exactly the same number of
### elements

printemptystimuli=function(n)
{
 if ( n > 0 )
   {
    for ( i in 1:n )
     cat( " empty 250 250 ")
  }
}

countervalue <<- 1 # global variable for condition
counter=function()
{
 z = countervalue
 countervalue <<- countervalue+1
 return ( z )
}

# -----------------

#### if I want 50 trials, I need to set j to (at least) 50 trials / 8 (2*4 set sizes) = 7

j = 7 ### the number of trials for each set size (*2)

for ( setsize in c(5,10,15,20) ) ### only use these 4 set sizes
{

 # target present trials:
  
 for ( i in 1:j ) # for each repetition of this condition
 {
  stimulipos = sample( c(1:12,14:25) , setsize )  
  #take the first one as the target, the rest as distractors
  stimuli=c("target",sample( c("distractor1","distractor2"),replace=T,(setsize-1)))
  cat("  ",counter(),"1",setsize," ")
  printstimuli( stimuli , stimulipos )
  printemptystimuli( maxsetsize - setsize )
  cat("\n")
 }

 # target absent trials:
 
 for ( i in 1:j ) # for each repetition of this condition
 {
  stimulipos = sample( c(1:12,14:25) , setsize )  
  # all distractors
  stimuli=sample( c("distractor1","distractor2"),replace=T,(setsize))
  cat("  ",counter(),"0",setsize," ")
  printstimuli( stimuli , stimulipos )
  printemptystimuli( maxsetsize - setsize )
  cat("\n")
 }
}

