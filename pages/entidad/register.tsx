import commPlaceApi from '@/api/commPlace.api';
import entityApi from '@/api/entity.api';
import { Layout } from '@/base/Layout';
import { FormControlBox } from '@/components/boxes/FormControlBox';
import { RoundedBox } from '@/components/boxes/RoundedBox';
import { EntityForm } from '@/components/entidad/EntityForm';
import { TabPanel } from '@/components/tabs/TabPanel';
import { CommPlace } from '@/interfaces/entity.interface';
import { Box, Chip, InputLabel, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Col, Container, Radio, Row } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

export default function EntidadRegister() {

    
    

    return (
        <Layout>
            <div style={{
                minHeight: '100vh'
            }}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: '30px',
                        fontWeight: 'bolder'
                    }}
                    className='pb-5'
                >
                    Registro de entidades
                </Typography>
                <EntityForm />
            </div>
        </Layout>
    )

}