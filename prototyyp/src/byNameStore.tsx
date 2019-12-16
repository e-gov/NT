
type NamedObject = { name: string };

export interface ByNameStore<T extends NamedObject> {
  byName: { [k: string]: T },
  allNames: string[];
}

export function addByName<T extends NamedObject>(old: ByNameStore<T> = emptyStore(), init: T): ByNameStore<T> {
  return {
    byName: { ...old.byName, [init.name]: init },
    allNames: old.allNames.filter(n => n !== init.name).concat(init.name),
  }
}

export function reduceByName<T extends NamedObject>(old: ByNameStore<T> = emptyStore(), reducer: (i: T) => T): ByNameStore<T> {
  return {
    ...old,
    byName: Object.assign({}, ...old.allNames.map((k) => ({ [k]: reducer(old.byName[k]) })))
  }
}

export function emptyStore<T extends NamedObject>(): ByNameStore<T> {
  return { byName: {}, allNames: [] };
}

export function fromArray<T extends NamedObject>(a: T[]): ByNameStore<T> {
  return a.reduce(addByName, emptyStore());
}