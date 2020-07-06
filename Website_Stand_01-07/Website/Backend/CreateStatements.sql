CREATE TABLE User(
	ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Benutzername TEXT NOT NULL UNIQUE,
	Vorname TEXT NOT NULL,
	Nachname TEXT NOT NULL,
	EMail TEXT NOT NULL,
	Passwort TEXT NOT NULL,
	Strasse TEXT NOT NULL,
	PLZ TEXT NOT NULL,
	Stadt TEXT NOT NULL
	);

CREATE TABLE Arbeitgeber (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Name TEXT NOT NULL,
    Stundenlohn REAL NOT NULL,
	Strasse TEXT NOT NULL,
	PLZ TEXT NOT NULL,
	Stadt TEXT NOT NULL,
	CONSTRAINT fk_User1 FOREIGN KEY (UserID) REFERENCES User(ID)
);

CREATE TABLE Schicht (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    ArbeitgeberID INTEGER NOT NULL,
    Bezeichnung TEXT NOT NULL,
    Datum TEXT NOT NULL,
    Startzeit TEXT NOT NULL,
    Endzeit TEXT NOT NULL,
    Verdient REAL NOT NULL,
    Stunden INTEGER NOT NULL,
    CONSTRAINT fk_User2 FOREIGN KEY (UserID) REFERENCES User(ID),
    CONSTRAINT fk_Schicht1 FOREIGN KEY (ArbeitgeberID) REFERENCES Arbeitgeber(ID)
);


INSERT INTO "User"
(Benutzername, Vorname, Nachname, EMail, Passwort, Strasse, PLZ, Stadt)
VALUES('da', 'da', 'ad', 'da', 'da', 'da', 'da', 'da');

select * from user where id =1;

SELECT * from schicht order by datum;

select * from arbeitgeber where userID = 11 limit 1 OFFSET 3;

SELECT SUM(Verdient) as verdient FROM Schicht WHERE UserID =11 ;

SELECT ID FROM Arbeitgeber WHERE name = "Edeka";

select *from schicht where datum > "2020-06-28T00:00:00.000Z" order by datum;

select * from schicht where strftime('%Y', datum) = "2020";

select count(*),a.name, (select sum(verdient) from Schicht s where s.ArbeitgeberID  = a.ID and s.datum between "2020-06-30T00:00:00.000Z" and "2020-07-01T00:00:00.000Z" )from Arbeitgeber a where UserID  = 11;

(select sum(verdient) from schicht where userID = 11 and ArbeitgeberID = 1 and datum between "2020-06-29T00:00:00.000Z" and "2020-07-01T00:00:00.000Z")
select strftime('%m', datum) from schicht;

strftime('%m', dateField)

SELECT a.name, (SELECT SUM(verdient) from Schicht s where s.ArbeitgeberID = a.ID AND s.datum between "2020-06-29T00:00:00.000Z" and "2020-07-01T00:00:00.000Z") as insgesamt FROM Arbeitgeber a where userID=11 ;



Drop Table User;
Drop Table Schicht;
Drop Table Arbeitgeber ;