import { Entity } from './entity';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

let setLoading = (loading: boolean) => {
  console.log('loading,', loading);
};
// export const addDoc = ()
export const addDocument = <T>(entityName: Entity, obj: T) =>
  new Promise<string>((resolve, reject) => {
    const saveObj = { ...obj, updated: Timestamp.now() };
    // @ts-ignore
    delete saveObj.id; // Allow id auto generation and remove exsting id params
    addDoc(collection(db, entityName), saveObj)
      .then((docRef: any) => {
        resolve(docRef.id);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const deleteDocument = (entityName: Entity, id: string) =>
  new Promise<boolean>((resolve, reject) => {
    deleteDoc(doc(db, entityName, id))
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const addDocumentWithId = <T>(entityName: Entity, id: string, obj: T) =>
  new Promise((resolve, reject) => {
    const saveObj = { ...obj, updated: Timestamp.now() };
    // @ts-ignore
    delete saveObj.id; // Allow id auto generation and remove exsting id params

    const ref = doc(db, entityName, id);
    setDoc(ref, saveObj, { merge: true })
      .then((data: any) => {
        console.log('Added', data);
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const updateDocument = (entityName: Entity, id: string, obj: any) =>
  new Promise((resolve, reject) => {
    const saveObj = { ...obj, updated: Timestamp.now() };
    // @ts-ignore
    delete saveObj.id; // Allow id auto generation and remove exsting id params

    const ref = doc(db, entityName, id);
    updateDoc(ref, saveObj)
      .then((data: any) => {
        console.log('Updated', data);
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const addOrUpdateDocument = <T>(entityName: Entity, id: string, obj: T) =>
  new Promise((resolve, reject) => {
    const saveObj = { ...obj, updated: Timestamp.now() };

    const ref = doc(db, entityName, id);
    setDoc(ref, saveObj, { merge: true })
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

export const getDocumentsWithProps = <T>(
  entityName: Entity,
  conditions: Partial<T>,
  showLoading: boolean = true
): Promise<T[]> =>
  new Promise((resolves, reject) => {
    setLoading(showLoading);

    const ref = collection(db, entityName);

    let query: any;

    Object.keys(conditions).forEach((key) => {
      if (key.includes('>') || key.includes('<')) {
        query = (query ?? ref).where(
          key.substring(0, key.length - 1),
          key.charAt(key.length - 1),
          conditions[key as keyof T]
        );
      } else if (key === 'limit') {
        query = (query ?? ref).limit(conditions[key as keyof T]);
      } else if (Array.isArray(conditions[key as keyof T])) {
        // @ts-ignore
        query = (query ?? ref).where(key, 'array-contains', conditions[key][0]);
      } else {
        query = (query ?? ref).where(key, '==', conditions[key as keyof T]);
      }
    });

    const results: any = [];

    getDocs(query ?? ref)
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          const v = doc.data();
          v.id = doc.id;
          results.push(v);
        });
        // Store result in cache and resolve
        // store[generateRequestKey(entityName, conditions)] = results;
        setLoading(false);
        resolves(results);
      })
      .catch((err: any) => {
        console.error(err);
        setLoading(false);
        reject(err);
      });
  });

export const getDocumentWithId = <T>(
  entityName: Entity,
  id: string,
  showLoading: boolean = true
): Promise<T | null> =>
  new Promise((resolves, reject) => {
    setLoading(showLoading);
    getDoc(doc(db, entityName, id))
      .then((doc: any) => {
        if (doc.exists) {
          const dat = doc.data();
          dat.id = id;
          setLoading(false);
          resolves(dat);
        } else {
          setLoading(false);
          resolves(null);
          console.error(`${entityName}: ${id} : No such document!`);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setLoading(false);
        reject(err);
      });
  });
