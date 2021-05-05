# salary-calculator
This is a calculator project that allows users to estimate the growth of their salary over a period of time. it has a feature that allows users to account for promotions, hikes and switches.

--fixed--
This is the first version of this webapp and user experience features is not complete.
the core functionality is complete except for the hike using percentage.
--

future updates:
  1. add more promotion slots    --fixed in v2.0
  2. integrate CSS/bootstrap styling	--not completed, basic aligning completed in v2.0
  3. fix bugs with percentage hikes		--fixed in v2.0
  4. clear table upon new request
<<<<<<< HEAD
  5. add sample career projection for certain popular positions
=======
  5. add sample career projction for certain popular positions

pseudo code structure:
  
  get input values
  instantiate output vaiables
  
  for loop for period of calculation{
    if promotion{
      if percentage based promotion{
        set output values
      }else if absolute based promotion{
        set output values
      }
    }
    else if 1st year{
      set output values
    }
    else if not first year and no promotion{
      set output values
    }
    
    append output to html table
  }
  
  other helper functions
>>>>>>> refs/remotes/origin/main
