# LM Studio interfacer

<p>This is a Fairly basic webapp designed to interface with LMstudio on an LAN from a different machine. I built this to solve an issue of running local AI assistants to different systems on my network. While I doubt that anyone is going to read this, Please email me at Keifertrampf@gmail.com if there are any questions regarding this.</p>

## Requirments

<p>This is more or less an independant extension of LMstudio, so it is required to operate, as well as python to operate the server.</p>

## Usage

<p>The app is coded in vanilla JS, so no installs are needed short of python in order to start the server. Once the server is active, it can be accessed using any web browser. To start the server, simply navigate to the directory and run:<br><code>python -m http.server 8080</code><br> Then go to http://192.168.1.75:8080/ to see the interface.

### Note

<p> This has been written preemptively and is in a minimally working state. After working with this further I may change to try and make it to run ollama on the hosting system </p>
