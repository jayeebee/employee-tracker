INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jason', 'Bailey', 1, 1),
    ('Craig', 'Testman', 2, 2),
    ('Steve', 'Defaultman', 3, 3);

INSERT INTO department (name)
VALUES
    ('Quality Assurance'),
    ('Sales'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('QA Manager', 42500, 1),
    ('Sales Person', 37250, 2),
    ('Software Engineer', 99000, 3);