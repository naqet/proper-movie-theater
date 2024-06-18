import type {Actions} from "./$types"

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData()
        console.log({formData})
    }
} satisfies Actions
