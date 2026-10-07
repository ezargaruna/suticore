export async function navigation() {

    const r = await fetch("/index/documents.json")

    return await r.json()

}
