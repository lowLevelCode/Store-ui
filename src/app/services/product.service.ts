import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.mode';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProductService {
    private readonly _url = environment.endpoint;
    constructor(private httpClient: HttpClient) { }
 
    find():Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this._url}/product`);
    }

    add(product:Partial<ProductModel>):Observable<any>{
        return this.httpClient.post<any>(`${this._url}/product`, product);
    }

    update(id:number, product:Partial<ProductModel>):Observable<any>{
        return this.httpClient.put<any>(`${this._url}/product/${id}`, product);
    }

    delete(id:number):Observable<any>{
        return this.httpClient.delete<any>(`${this._url}/product/${id}`);
    }
}