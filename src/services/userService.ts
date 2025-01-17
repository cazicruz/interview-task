import { prismaClient } from '..';



class UserService {
    public async updateUser( userId:string, updateObj:UserObj) {
        const updatedUser = await prismaClient.user.update({
            where: { id: userId },
            data: updateObj,
        });
        return { success: true, data: updatedUser };
    }
}

const userServiceInstance = new UserService();
export const userService = userServiceInstance;