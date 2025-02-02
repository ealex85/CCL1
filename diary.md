### 13.1.2025
Today I implemented the WASD-movement of the player character and the enemy with random movement. I added a “map”, and I also implemented collision detection for Player as well as Enemy.
I also implemented the time-manipulation mechanic: One button to slow the enemy down, one button to speed the enemy up.
I also started working on the dash for the player character but haven't finished it. This is what I will start with tomorrow and then work on attacks.

### 14.1.2025
I finished implementing the dash and it has a cooldown to avoid spamming it. Then I reworked the enemy’s movement pattern. Instead of having it randomly walk around the map, it now chases the player. To give the player a break and window to attack the enemy, I added a stop mechanic as well. Tomorrow I will randomize the interval of stop and walk.
Additionally, after the enemy starts walking again, a random velocity is generated but it respects the time manipulation.
I also added an attack button for the player, that however does nothing at the moment other than switch the sprite index (to visualize an attack), as the testing spritesheet doesn’t have an attack animation.
Also added a simple HP score for player and enemy that is displayed just below the canvas. The player loses hp when it collides with the enemy. There is 1.5 seconds cooldown for enemy attack.

Tomorrow I will also refine the input for the player. I will also try to apply damage to the enemy when using the attack.

### 15.1.2025
I implemented hp reduction on successful attack from player. Also chase and stop interval of enemy movement is now random.
Player now loses hp when using slow and gains hp when using speed up time.
I started working player input to make it smoother, however I wasn't successful.

Tomorrow I will keep working on player input and ask a teacher/tutor for help.
Then, I will work on the hp bar for both, player and enemy.

### 16.1.2025
Implemented the hp bar in the canvas for player as well as enemy. 
Then I kept working on the player input but because the teachers were busy I tried it on my own and managed to fix most of it. Only the opposite directions aren't behaving as expected. Also started working on the start screen.

### 17.1.2025
I tried to give the enemy an attack animation with placeholder spritesheet to have a better idea of what I will draw for the enemy. However, it didn't manage to fully implement it like I would have liked. Also refactored a bit of code to keep it maintainable. 

Tomorrow I will focus on the art part of the game.

### 18.1.2025
Drew the background, different versions of wall blocks and implemented them into the game, but it looked very weird and didn't make much sense with the game idea. Since the background isn’t a fully enclosed space,  I decided to take “invisible” blocks of walls and place them there instead.

Tomorrow I will do spritesheet for the characters.

### 19.1.2025
Completed the spritesheets for player and for enemy. I chose a pixel art style for everything as I find that easier to draw and I'm not very good at it.

Tomorrow I will refine the background image.

### 20.1.2025
Started refining the background image, added shading, made it look older, more like a ruin and general line refinements. Also realized that I need to add a dashing animation for the player.

Tomorrow I will finish the background Image. Also I will draw Start, Game Over and How To Play screens and if time allows it, add the missing frames for the player character.

### 21.1.2025
I finished drawing the background image. Also added the dashing frames for the character and I also drew the game over screen, you win screen and how to play screen. But they aren't implemented into the game yet.
In between I also asked a teacher about a problem with the enemy movement and also the hitbox of the player. He suggested implementing a new concept: Drill triggers. I tried to implement them on my own but I wasn't successful. The Drill triggers are there and work but I don't know how to really handle it so I will ask him tomorrow again. Also started to work on the dashing, so I have an increased velocity for a short period of time instead of just adding/removing to/from x and y, so it looks smoother. Didn't fully manage to implement that either so tomorrow I will focus on these two things I couldn't implement today.

### 22.1.2025
I asked the teacher about the Drill triggers, which are just hitboxes, and he helped me finish the implementation. He also help me fix the dash to 90%. Later I implemented the remaining screens.

Tomorrow I will focus on polishing the game.

### 23.1.2025
I polished the dash, so you can’t hold the Shift button anymore and also the same for the attack. Then I also refined the hitboxes for the player and renamed Drill Triggers to Attack Triggers (makes more sense. At first I thought the concept was called Drill Triggers, but turns out it was just a class name).
I also repositioned the hp bars from the top of the canvas to just above the characters.
