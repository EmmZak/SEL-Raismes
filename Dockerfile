FROM node:latest    

EXPOSE 8080

WORKDIR /app

#RUN npm install

CMD ["npm", "run", "serve"]

#docker run -it -p 8080:8080 --rm -v /home/ubikadmin/Documents/PROJECTS/sel-raismes:/app troc-docker