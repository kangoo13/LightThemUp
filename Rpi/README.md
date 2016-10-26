# LightThemUp

Projet EIP pour valider la 5ème année d'EPITECH

## Installation 



## Code Example

```python
import BluetoothLib # inclution de la lib
import time

lol = BluetoothLib.BluetoothSock("/dev/ttyAMA0")     # création de la socket bluetooth, prend en paramètre le path du tty serial ("/dev/ttyAMA0" pour le Raspberry Pi 1)
lol.startRecevThread();                              # lancement du thread de reception

while True:
    if lol.count_message() != 0:                        # Check si il y as des message à lire
        print "Message get : '"+lol.get_message()+"'"   # Lecture du message (get_message est bloquant si il n'y as pas de message et attendras qu'il y en ai un)
        lol.write("Ok\n")                               # Renvoi "Ok\n" en réponse
    time.sleep(0.01)
```