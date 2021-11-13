# Project Snail Mail

Snail Mail is an online social networking portal that enables our users to connect with new people, both locally and internationally, through a virtual simulated mail and parcel network to **promote a slower pace of life.**

## Description

Living in a fast-paced society where instant messaging becomes an incessant distraction from genuine interactions, our group hopes to promote a slower pace of life through Snail Mail. Snail Mail allows users to take things slowly and meet new people - by delaying mail delivery according to geographic distance.

To cultivate the habit of patient and meaningful conversation, we have designed our mail application to only allow one mail at a time until the receiver opens it. The intentional lack of 'Read' signatures also takes away the urgency in replies, and imparts a sense of transience in a friendship.

Moreover, as our users send countless Snail Mails to their new companions, the waiting period brings back the nostalgic anticipation we get from waiting for mail in our letterboxes back in the heydays of physical mail. Connected users can also choose to engage in various mini-games, where a player can only make a move after the other player has done so; however long that might take. With the exception of several APIs, most of the functionalities in this application is coded from scratch without the use of existing website templates.

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

Feel free to use the test account to view the interface 
<br/>Email: vipuser1@gmail.com
<br/>Password: pass1234

## Features

* Snail Mail with built-in delay
* Correspondence Connect 4
* Hangman (Beta) individual game for now  

## Testing Interface
```
Sign up and login with an account
Get randomly matched to a friend
Send a Snail Mail to a friend
Receive Snail Mail from a friend 
Play Connect 4 with a friend
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
Tan Hui Ru
<br/>Mindy Bok Zhuang Min
<br/>Teo Wei Hern
<br/>Gadman Tang Yi Luo
<br/>Biondi Lee
