import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuarioService {

  constructor(private http: HttpClient) { }

  getUser(mail):Observable<any>
  {
    return this.http.get('http://127.0.0.1:8000/api/usuario/'+mail).pipe(retry(3));
  }

  postUser(usuario):Observable<any>
  {
    return this.http.post('http://127.0.0.1:8000/api/usuario/',usuario);
  }

  putUser(mail, usuario):Observable<any>
  {
    return this.http.put('http://127.0.0.1:8000/api/usuario/'+mail , usuario);
  }

  deleteUser(mail):Observable<any>
  {
    return this.http.delete('http://127.0.0.1:8000/api/usuario/'+mail);
  }


}



