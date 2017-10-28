import { MockPersonList } from './mock-person-data.model';


export class PersonDataService {

    personList: Array<any> = [];
    personList1: Array<any> = [];
    persons: Array<any> = [];

    constructor(){
        this.personList = (new MockPersonList()).getPersonList();
        this.personList1 = (new MockPersonList()).getPersonList1();
        this.loadPersonList(); 
    }

    public getPersonList() {
        return this.persons;
    }

    public loadPersonList() {
        console.log('Size of person list: ' + this.persons.length);
        this.persons = this.persons.concat(this.addContactsToList());
        console.log('Size of person list: ' + this.persons.length);
        this.persons = this.persons.concat(this.addSubordinatesToList());
        console.log('Size of person list: ' + this.persons.length);       
    }

    public addContactsToList(): Array<any> {
        let list: Array<any> = [];
        list = this.includeHeaderRow(this.personList, ['Name', 'Bank']);
        list = this.includeTypes(list, 'contact');
        list = this.markDeletable(list, true);
        list = this.includeIndexOrdering(list);
        console.log('Size of contacts list: ' + list.length);
        return list;
    }

    public addSubordinatesToList(): Array<any> {
        let list: Array<any> = [];
        list = this.includeHeaderRow(this.personList1, ['Name', 'Bank', 'Balance']);
        list = this.includeTypes(list, 'subordinates');
        list = this.includeIndexOrdering(list);
        console.log('Size of subordinates list: ' + list.length);
        return list;
    }

    public includeHeaderRow(list: Array<any>, _headers: Array<string>) {

        list.sort((a, b) => (a.name > b.name) ? 1 : -1 );
       list.unshift({
            'name': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            '_headers': _headers,
            '_isHeaderRow': true
        });

        return list;
    }

    public includeTypes(list: Array<any>, _type: string) {
        return list.map(e => {
              e._type = _type;
              return e;
        });
    }
    public markDeletable(list: Array<any>, _isDeletable: boolean) {
        return list.map(e => {
                if (e.isHeaderRow !== true) {
                    e._isDeletable = _isDeletable;
                }
              return e;
        });
    }

    public includeIndexOrdering(list: Array<any>) {
        return list.map(e => {
            e._index = list.indexOf(e);
            return e;
      });
    }
}
