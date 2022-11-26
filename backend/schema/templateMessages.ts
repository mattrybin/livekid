import { z } from "zod"

const templateMessage = z.object({
  name: z.string(),
  text_child: z.string().nullable(),
  type: z.string().endsWith("-template"),
  prefix: z.boolean(),
  id: z.number().positive(),
  avatar: z.string(),
  text_girl: z.string().min(1).max(255),
  text_boy: z.string().min(1).max(255),
  unisex: z.boolean(),
})

const templateMessages = z.array(templateMessage)

export const templateMessageInput = templateMessage.pick({ id: true })
export const templateMessageOutput = templateMessage
export const templateMessageOutputDummy = (id?: number): z.infer<typeof templateMessage> => ({
  name: "Temperature",
  text_child: null,
  type: "message-template",
  prefix: true,
  id: id ?? 123,
  avatar: "11",
  text_girl: "has fever. Please pick-up your daughter as soon as possible.",
  text_boy: "has fever. Please pick-up your son from as soon as possible.",
  unisex: false,
})

export const templateMessagesInput = templateMessage.pick({ type: true })
export const templateMessagesOutput = templateMessages
export const templateMessagesOutputDummy = (): z.infer<typeof templateMessages> => [
  templateMessageOutputDummy(100),
  templateMessageOutputDummy(101),
  templateMessageOutputDummy(102),
]

// [
//     {
//         "name": "Temperature",
//         "text_child": null,
//         "type": "message-template",
//         "prefix": true,
//         "id": 23441797,
//         "avatar": "11",
//         "text_girl": "has fever. Please pick-up your daughter as soon as possible.",
//         "text_boy": "has fever. Please pick-up your son from as soon as possible.",
//         "unisex": false
//     },
//     {
//         "name": "Nappies",
//         "text_child": null,
//         "type": "message-template",
//         "prefix": true,
//         "id": 23441798,
//         "avatar": "2",
//         "text_girl": "used all the nappies. Please provide new pack. Greeting, Aunties",
//         "text_boy": "used all the nappies. Please provide new pack. Greeting, Aunties",
//         "unisex": false
//     }
// ]
