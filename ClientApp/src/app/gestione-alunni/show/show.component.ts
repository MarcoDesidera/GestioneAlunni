import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DbFunctionService } from 'src/app/db-function.service'; //servizio per collegarsi con l'API
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //Definisco le variabili
  
  public displayedColumns: string[] = ['StudenteID', 'Nome', 'Cognome', 'DataDiNascita', 'Classe', 'Options'];
  public classes : Class[];
  public selectedClass : Class;
  public students : Students[];
  public service : DbFunctionService = new DbFunctionService(this.http, this.baseUrl);
  private ActivateAddEditComponent : boolean = false;
  private student : Students;
  private class : any;
  private NomeStudente:string = "";
  private CognomeStudente:string = "";
  private DataDiNascitaStudente = "";
  private DataBackup: Students[];
  dataSource : any;

  //definisco le variabili utili alla comunicazione con l'API direttamente nel costruttore
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  ngOnInit() {
    this.getClasses();
  }

  //invia una richiesta get all'API utilizzando il servizio DbFunctionService ottenendo una lista delle classi
  getClasses()
  {
    this.service.getClasses().subscribe(result => {
      this.classes = result;
    }, error => console.error(error));
  }
  
  //invia una richiesta get all'API utilizzando il servizio DbFunctionService ottenendo una lista degli alunni di tutte le classi
  getStudents(value)
  {
    this.service.getStudents(value).subscribe(result => {
      this.students = result;
      this.DataBackup = result;
      this.dataSource = new MatTableDataSource(this.students);
    }, error => console.error(error));
  }

  
  //quando si sceglie una classe dal select si chiama il metodo getStudents() con argomento la classe selezionata
  onChange(event)
  {
    this.class = event;
    this.getStudents(this.class.value);
  }

  //funzione per il pulsante per aggiungere nuovi studenti utilizzando come StudenteID (chiave primaria) 0
  addClick()
  {
    this.student = {
      StudenteID : 0,
      Nome: '',
      Cognome: '',
      DataDiNascita: '',
      Classe: ''
    }

	//condizione booleana per attivare il componente add-editComponent
    this.ActivateAddEditComponent = true;
  }

  //funzione per chiudere la form per aggiungere gli studenti
  closeForm(){
    this.ActivateAddEditComponent = false;
  }

  //funzione per modificare uno studente passando i dati dello studente e attivando il componente add-editComponent
  editClick(item)
  {
    this.student = item;
    this.ActivateAddEditComponent = true;
  }

  //funzione per cancellare dal db uno studente chiedendo una conferma all'utente
  deleteStudent(item)
  {
    console.log(item);
    if(confirm("Sei sicuro?"))
    {
	  //chiama il metodo HTTP delete del servizio 
      this.service.deleteStudent(item.StudenteID).subscribe(result =>
        {
          alert(result.toString());
        });
      this.getStudents(this.class.value);
    }
  }

}

//interfacce per definire le tabelle del database utilizzate
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
