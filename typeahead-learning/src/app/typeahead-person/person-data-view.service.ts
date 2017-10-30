
export class PersonDataViewService {

    personsProvided: Array<any>;
    personsInfo: Array<any>;

    persons: Array<any> = [];

    constructor(personsProvided: Array<any>, personsInfo: Array<any>) {
        this.personsProvided = personsProvided;
        this.personsInfo = personsInfo;
        this.loadPersonList();
    }

    public getPersonList() {
        return this.persons;
    }

    public loadPersonList() {
      for(let i = 0; i < this.personsProvided.length ; i++){
        this.persons = this.persons.concat(this.addToList(i));
      }
    }

    public addToList(index: number): Array<any> {
      let list: Array<any> = [];
      list = list.concat(this.personsProvided[index]);
      list = this.includeHeaderRow(list, (this.personsInfo[index])['_headers']);
      list = this.includeTypes(list, (this.personsInfo[index])['_type']);
      list = this.markDeletable(list, (this.personsInfo[index])['_isDeletable']);
      list = this.includeIndexOrdering(list);
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
                if (e._isHeaderRow !== true) {
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
