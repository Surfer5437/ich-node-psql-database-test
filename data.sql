DROP TABLE IF EXISTS ich_test;

CREATE DATABASE ich_test;

\c ich_test;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies(
    id serial PRIMARY KEY,
    name text NOT NULL,
    address text NOT NULL,
    phone_number text,
    service_type text
);

INSERT INTO companies(name, address, phone_number, service_type)
    VALUES ('Company 1', '123 main st', '6015467891', 'service'),
('Company 2', '987 central ave', '3465189624', 'service'),
('Company 3', '1642 rosy blvd', '7956152348', 'service'),
('Company 4', '4 4th st', '6018962473', 'service'),
('Company 5', '3245 creekbend rd', '6014625368', 'service'),
('Company 6', '1973 industrial pkwy', '6017913452', 'build'),
('Company 7', '456 marina st', '6014698521', 'service');

DROP TABLE IF EXISTS invoices;

CREATE TABLE invoices(
    id serial PRIMARY KEY,
    cost float NOT NULL,
    paid boolean DEFAULT FALSE,
    add_date text,
    paid_date text
);

INSERT INTO invoices(
    COST, paid, add_date, paid_date)
    VALUES ('456.23', '0', '4/24/2023', '');

INSERT INTO invoices(
    COST, paid, add_date, paid_date)
    VALUES ('4256.23', '1', '4/2/2023', '4/23/2023');

INSERT INTO invoices(
    COST, paid, add_date, paid_date)
    VALUES ('19562.56', '1', '6/8/2005', '4/1/2023');

DROP TABLE IF EXISTS companies_invoices;

CREATE TABLE companies_invoices(
    id serial PRIMARY KEY,
    invoice_id integer REFERENCES invoices ON DELETE CASCADE,
    companies_id integer REFERENCES companies ON DELETE CASCADE
);

INSERT INTO companies_invoices(invoice_id, companies_id)
    VALUES ('1', '3'),
('2', '6');

-- SELECT * FROM companies JOIN companies_invoices ON companies.id=companies_invoices.companies_id JOIN invoices ON companies_invoices.invoice_id=invoices.id;
