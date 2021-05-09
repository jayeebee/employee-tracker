INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Bluth', 1, 1),
    ('Craig', 'Testman', 2, 2),
    ('Steve', 'Defaultman', 3, 3),
    ('Lucille', 'Two', 4, null),
    ('Maeby', 'Funke', 7, 5),
    ('Tobias', 'Funke', 6, 4),
    ('Gob', 'Bluth', 5, null);

INSERT INTO department (name)
VALUES
    ('Finance'),
    ('Sales'),
    ('Legal'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 2),
    ('Sales Person', 80000, 2),
    ('Software Engineer', 120000, 4),
    ('Lead Engineer', 150000, 4),
    ('Lawyer', 190000, 3),
    ('Legal Team Lead', 250000, 3),
    ('Accountant', 125000, 1);