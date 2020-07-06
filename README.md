**BITTE LESEN** 

Abgabe der Versionierung Software Engineering

Gruppe: Johannes Weiß, David Kokoschka, Markus Fröhlich, Roman Alyunov

Hier wird die Vorgehensweise für die Erstellung formuliert:

1. Repository mit git bash erstellen:
	- Ordner erstellen, der das Repository sein soll und diesen auswählen
	- Befehl: **git init** zum erstellen eines leeren Repository
	- Befehl: **git add README.md** und **git add LICENSE.md** zum hinzufügen der 2 Dateien
	- Befehl: **git commit -m "READMe und LICENSE hinzugefügt"** wird ein Commit erstellt, um den Zustand des Projekts festzuhalten
   -> Hiermit befinden sich zunächst 2 Dateien in unserem Repository

2. Version ins Repository laden:
	- Wir legen unsere Website in denn Ordner wo sich unser lokales Repository befindet
	- Wir geben denn denn Befehl ein: **git add Website_Stand_24-05/** -> damit wird unser Ordner hinzugefügt
	- Dann: **git commit -m "Stand der Website am 24.05"** -> damit wird der Ordner fester bestandteil des Repository
    2.1 Um unser lokales Repository auf GitHub zu sehen müssen wir auf GitHub ein leeres Repository erstellen und denn Link davon kopieren
	   der Link sieht ungefähr so aus **origin https://github.com/user-name/name-des-repository.git**
	- wir geben denn Befehl **git remote add origin https://github.com/Executive7/Versionierung_SoftwareEngineering.git** -> hiermit 
	  verknüfpen wir das lokale Repository mit dem auf der Website
    -> um nun unsere Version der Website (sowie README und LICSENCE) hochzuladen tippen wir ein:
       **git push -u origin master**  -> nun ist unser Repo auf der Website gleich dem lokalen
       (das kann man mit anderen Versionen gleich machen)

3. Erstellen und verwenden eines Branch:
	der default branch auf dem man sich standartmäßig befindet, ist zum verteilen der Software da
	wenn wir einen neuen branch erstellen, können wir dort Sachen ändern oder ergänzen, ohne das es sofort wirksam wird
	sind wir mit denn Änderungen auf dem neuen/anderen branch zufrieden, können wir diese auf dem Hauptbranch wirksam machen (mit merge)
	- erstellen eines neuen branch: **git branch bearbeiten**
	- wir wechseln nun in diesen neuen branch mit: **git checkout bearbeiten**
	- nun können wir hier Änderungen vornehmen und probieren
	z.B. wir möchten eine unnütze Datei löschen, dazu gehen wir wie folgt vor:
		**git rm datei_name**
		**git commit -m "Datei löschen"** -> datei wurde nicht wirklich gelöscht, da wir auf einem anderen Branch sind

4. Merge - überführung von Änderungen eines anderen branch (nicht master)
	Merge verbindet die Zweige master und bearbeiten (in unserem Fall)
	- wir wechseln erst in den master Zweig: **git checkout master**
	- Befehl: **git merge bearbeiten**   -> macht die Änderungen vom branch bearbeiten wirksam
			    branchname
	- (gegebenenfalls branch mit **git branch -d bearbeiten** löschen da wir nichts weiter machen möchten mit dem branch)
	- jetzt wieder: **git push** -> damit die Änderung auch auf GitHub wirksam wird
____________________________________________________________________________________________________________________
Branch und Merge nochmal übersichtlich
für unser Programm:
bei der Version vom 24.05 kann man das Impressum zum Beispiel über branch und merge hinzufügen:

**git branch impressum**				wir erstellen eine neue branch
**git checkout impressum**				wir wechseln in die branch rein

**git add Website_Stand_24-05/Website/impressum.html**  wir fügen das Impressu hinzu
**git commit -m "Impressum hinzufügen"**

**git checkout master**					wir gehen in den main branch

**git merge impressum**					wir benutzen merge um die Änderung durchzuführen

**git branch -d impressum**				wir löschen denn branch impressum

**git push**						und laden die neueste version (mit impressum) hoch

____________________________________________________________________________________________________________________
Nur ein Beispiel, unabhängig von unserer Website				
**git add Datei.txt**
**git commit -m "Neue Datei"**

**git push**				Datei wird auf GitHub Repo hochgeladen

**git branch dateiloeschen**		Erstellen eines neuen branches
**git checkout dateiloeschen**		Wir gehen in diesen branch

**git rm Datei.txt
**git commit -m "Datei wird gelöscht"**	

**git checkout master**			Wir gehen zurück in den Haupt branch
**git merge dateiloeschen**		Wir machen die Änderungen in dateiloeschen wirksam

**git branch -d dateiloeschen**		branch löschen
**git push**				Erneuerung von GitHub -> Datei ist weg
	
