import { Layout } from '@/base/Layout';
import { UserForm } from '@/components/user/registerUser/UserForm';

export default function RegisterUser() {


    

    return (
        <Layout>
            <div style={{
                height: '100vh',
            }}>
                <span
                    className='flex justify-center font-semibold text-3xl pb-10'
                >
                    Registro de Beneficiario
                </span>
                <UserForm
                    type='create'
                />
            </div>
        </Layout>
    )

}