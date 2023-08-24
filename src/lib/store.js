import { readable, writable } from 'svelte/store';
import Strapi from './useStrapi';

let strapi = readable(new Strapi());
let theme = writable('');

export { strapi, theme };
