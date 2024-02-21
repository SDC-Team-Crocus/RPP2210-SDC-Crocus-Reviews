# Crocus SDC system design - API

Refactored monolithic ecommerce backend microservice API optimized to support high traffic

# Technology Used

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) 	![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) 	![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
<a style='display: inline-block; margin-left: 10px;' href='https://github.com/shivamkapasia0' target="_blank" s><img alt='LOADER.IO' src='https://img.shields.io/badge/LOADER.IO-100000?style=for-the-badge&logo=LOADER.IO&logoColor=866060&labelColor=FF80F6&color=FF5DEC'/>
</a><a href='https://github.com/shivamkapasia0' style='display: inline-block; margin-left: 10px;' target="_blank"><img alt='' src='https://img.shields.io/badge/K6-100000?style=for-the-badge&logo=&logoColor=866060&labelColor=FF80F6&color=FFAF24'/></a>
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Connect with me:

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/georgeliu123/)

Initial Structured Schema used to plan out the Database Structure:

![image](https://drive.google.com/uc?export=view&id=1jc6f7XnSW8Kxd_1jq3obGJGwmJjE3JTQ)

Created Database and Tables.

![image](https://drive.google.com/uc?export=view&id=1r1EYt8RaCSg8TzDf7LChGMZtUq_p4iwJ)

Complete the ETL process to load the data into PostgreSQL database.

![image](https://drive.google.com/uc?export=view&id=17FTwuO0WSZYlP4Shd6yhyZ4jb6d0GGST).

Write and run JEST tests to test controllers and routers.

![image](https://drive.google.com/uc?export=view&id=1kJLhG1R_YWpF8hiua9gaFFYuyL3PWG9K)

Write and run JEST tests to test controllers and routers.

![image](https://drive.google.com/uc?export=view&id=1hk76JAZO6lDUq2q-CMssz-4EmHBnb-n1)

K6 stress test before and after database indexing - huge improvement for the API performace

![image](https://drive.google.com/uc?export=view&id=16b3175D0Q5TJFNOxwdxL8GbK4hBkdmPD)

Use docker to deploy 1 Nginx load balancer, 3 servers (each with redis caching) and 1 PostgreSQL database to AWS EC2 instances (5 EC2 instances in total) - run loader.io stress test 2000 requests per second

![image](https://drive.google.com/uc?export=view&id=1EnfV2llcbe9tVLVbHiprhnqxlsvNCP1j)

After optimizing the query, the deployed API can reach 4000 requests per second

![image](https://drive.google.com/uc?export=view&id=15cuzWtJ6Si7_FxweU2dOvYSAnk0I9REI)

