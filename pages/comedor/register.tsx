import commPlaceApi from "@/api/commPlace.api";
import entityApi from "@/api/entity.api";
import { Layout } from "@/base/Layout";
import { FormControlBox } from "@/components/boxes/FormControlBox";
import { RoundedBox } from "@/components/boxes/RoundedBox";
import { PlaceRegister } from "@/components/comedor/PlaceRegister";
import { TabPanel } from '@/components/tabs/TabPanel';
import { AddressInfo } from "@/components/user/registerUser/AddressInfo";
import { Entity } from "@/interfaces/entity.interface";
import { Chip, InputLabel, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Col, Container, Radio, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';


export default function ComedorRegister() {

    
    return (
        <Layout>
            <Text size={40} css={{
                textAlign: 'center',
                marginBottom: '10px'
            }}>
                Registrar comedor / economato
            </Text>
            <RoundedBox>
                <PlaceRegister />
            </RoundedBox>
        </Layout>
    )
}