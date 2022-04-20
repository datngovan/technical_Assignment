# technical_Assignment
Done:
* String: SET, GET
* Set: SADD, SREM, SMEMBERS, SINTERS
* DATA EXPIRATION: KEYS, DEL, EXPIRE, TTL
NOT Done:
Snap Shot and Test with Jest

--------------------------------------------------------------
Thinking process for each functions:

* String: SET, GET
  String format: Set format: key:{"value": , expiration: }
  SET: This one is pretty basic, I just get the input then do the localStorage.setItem(). However, because I have consider the expiration when I do this I haven't make a   format for what I save into the localStorage. Later I have to fix it.
  GET: Same level with the previous just get the input then localStorage.getItem(). I have to check if the return value is STRING or SET.
* Set: SADD, SREM, SMEMBERS, SINTERS
  Set format: key:{"value": [], expiration: }
  SADD: This one and the GET in the String function can overwrite each other. I have to fix the format for this one too when do the expiration date.
  SREM: When do this function I have made a intersection functions to find intersection array of 2 arrays. I found the intersection of the input and the LocalStorage one   to delete the intersection of those 2. For the elements that exist on the input but not in the database, I user the filter() to get the filter out all the element from   the input array that from the intersections.
  SMEMBERS: Same level with the GET but I have to check if the return value is STRING or SET.
  SINTERS: Reuse the function from SREM.
* DATA EXPIRATION: KEYS, DEL, EXPIRE, TTL
  KEYS: Find the number of keys, then use while loop to get all the key name using LocalStorage.key(index).
  DEL: Simply localStorage.removeItem.
  EXPIRE: If the String or Set haven't have expiration create one, If it's have modified. Using Date() + miliseconds * 1000. Create a function to constantly check the 
  current time with the expiration if any command is executed and DEL if the now()>expiration.
  TTL: if now()<=expiration then print out (expiration-now()) * 1000.
  
