import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbFunctionService {

  public classes : Class[];
  public selectedClass : Class;

  //definisco le variabili per connettersi al db
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  //metodo get per ottenere una lista delle classi
  getClasses()
  {
    return this.http.get<Class[]>(this.baseUrl + 'Classi');
  }

  //metodo get per ottenere una lista degli studenti passando come argomento la classe scelta
  getStudents(val : any)
  {
    return this.http.get<Students[]>(this.baseUrl + "Studenti/" + val);
  }

  //metodo post per aggiungere un nuovo studente al db
  addStudents(val : any)
  {
    return this.http.post(this.baseUrl + "Studenti", val);
  }

  //metodo put per modificare uno studente
  updateStudents(val : any)
  {
    return this.http.put(this.baseUrl + "Studenti", val);
  }

  //metodo delete per eliminare uno studente dal db
  deleteStudent(val : any)
  {
    return this.http.delete(this.baseUrl + "Studenti/" + val);
  }
}

//interfacce per definire le tabelle del db
interface Class {
  NomeClasse: string;
}

interface Students {
  StudenteID : number;
  Nome: string;
  Cognome: string;
  DataDiNascita: string;
  Classe: string;
}
