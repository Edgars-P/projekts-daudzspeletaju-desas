import PocketBase from "pocketbase"

import { writable } from "svelte/store";

const pb = new PocketBase('https://desasdb.0xff.lv');

export {pb}
export let userId = writable<string|undefined>(pb.authStore.model?.id)
export let authError = writable("")
export let processingLogin = writable(false)

export async function register(lietotajvards: string, epasts: string, parole: string) {

  processingLogin.set(true)
  authError.set("")

  const data = {
      "username": lietotajvards,
      "email": epasts,
      "emailVisibility": false,
      "password": parole,
      "passwordConfirm": parole,
      "admin": false
  };

  const record = await pb.collection('lietotaji').create(data).catch(err => {
    authError.set(err.message)
  });

}

export async function login(lietotajvards: string, parole: string) {

  processingLogin.set(true)
  authError.set("")

  const authData = await pb.collection('lietotaji').authWithPassword(
    lietotajvards,
    parole,
  ).catch(err => {
    authError.set(err.message)
  });

  userId.set(pb.authStore.model?.id)

}