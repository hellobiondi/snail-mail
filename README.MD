# Project Snail Mail

Snail Mail is an online social networking portal that enables our users to connect with new people, both locally and internationally, through a virtual simulated mail and parcel network to **promote a slower pace of life.**

## Description

As we are living in a fast-paced society, we hope to promote a slower pace of life through Snail Mail. Snail Mail aims to allow users to relax and take things slowly when meeting new people - by delaying mail/parcel delivery according to geographic distance.

To cultivate the habit of patient and meaningful conversation, we have designed our mail application to only allow one mail at a time until the receiver opened it. The anticipation and uncertainty whether the receiver open is also taken into consideration in our design.  

Moreover, as our users send countless Snail Mails to their new companions, the waiting period brings back the nostalgic feeling of anticipation we got when we were younger from waiting for mail in our letterbox. Connected users can also choose to engage in various mini games, where a player can only make a move after the other player has done so, like ‘Correspondence connect 4’.

## Getting Started

Set up required: Firebase
```
firebaseConfig in module.js
Data stored in firebase have to be in this format. 

Chats:{'uid':'chat'}
games:{'totalGames':"1"}
users:{'uid':'data'}
```

<br/>The application is currently hosted on https://snailmailhuat.netlify.app/

Feel free to use test account to see the interface 
<br/>email: vipuser1@gmail.com
<br/>pwd: pass1234

## Features

* Delay Mail
* Corresponding Connect 4
* Hangman (Beta) individual game for now  

## Testing Interface
```
Sign up and login with an account 
Find friends
Send a Mail to friend
Receive Mail from friend 
Play Connect 4 with friend 
```

## Delay details in cal_dist.js

| Distance (km) | Delay (days)  |
| ------------- |:-------------:|
| <500     | 0.1days  |
| <1000    | 1 days   |
| <1500  | 2 days     |
| <2000  | 3 days     |
| <2500  | 4 days     |
| <3000  | 5 days     |
| <3500  | 6 days     |
| <4000  | 7 days     |
| >=4000  | 8 days    |

## Authors
Tan Hui Ru<br/>
Mindy Bok Zhaung Min<br/>
Teo Wei Hern<br/>
Gadman Tang Yi Luo<br/>
Biondi Lee
