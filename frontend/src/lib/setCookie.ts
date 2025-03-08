'use server';

import { cookies } from 'next/headers';

export async function setCookie(key: string, value: string) {
    try {
        cookies().set({
            name: key,
            value: value,
            httpOnly: true,
            path: '/',
        });
    } catch (e) {
        console.error('SetCookie', e);
    }
}

export async function deleteCookies() {
    const allCookies = cookies().getAll();
    allCookies.map((cookie) => cookies().delete(cookie.name));
}
