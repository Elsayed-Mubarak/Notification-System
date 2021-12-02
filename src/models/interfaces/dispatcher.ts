import { MessageFromEvent } from '../interfaces/BaseProvider';

export const dispatcher = (message: MessageFromEvent) => {
    console.log("************** dispatcher ***************")
    console.log(message)
}

export const convertToTopicType = (type: String): string[] => {
    return type.split(" ");
}