drop database employee_details;

create database employee_details;

use employee_details;

create table department(
    id integer auto_increment not null,
    name varchar(30),
    primary key(id)
);

create table emp_role(
    id integer auto_increment not null,
    title varchar(30),
    salary decimal,
    department_id integer,
    primary key(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

create table employee(
    id integer auto_increment not null,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer,
    manager_id integer,
    primary key(id),
    FOREIGN KEY (role_id) REFERENCES emp_role(id),
    FOREIGN KEY (manager_id) REFERENCES emp_role(id)
);