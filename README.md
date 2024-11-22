# Apapung
Application that allows users to pit Pokémon and dogs against each other in a battling system.
The number of dogs (of a user-determined breed) required to fight a (user-determined) Pokémon will be calculated.
The price of the dogs will be calculated. This price will then be matched against the cost of different Amazon.com products filtered by type.

Thanks to my team, we won a hackathon with this a bit wierd project!

## To run an app on local machine
1. Have docker installed

2. run ```git clone https://github.com/Ktoettotakoy/apapung.git```

3. create .env file in /backend/apapung folder

4. add 3 tokens to .env
- SULU_TOKEN (we use https://platform.sulu.sh/)
- DOG_API_TOKEN ( we use https://www.thedogapi.com/)
- OPENAI_TOKEN ( any AI token you want, we use llama )

5. run ```docker-compose up --build``` from root directory of the project

