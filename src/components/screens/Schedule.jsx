import React from 'react'

import Layout from '../template/Layout'
import Header from '../template/Header'
import Footer from '../template/Footer'
import StudyItem from '../schedule/StudyItem'

const Schedule = ({ navigation, }) => {

    return (
        <Layout>
            <Header navigation={navigation} type={1} />
            <StudyItem />
            <Footer name='Study' navigation={navigation} />
        </Layout>
    )
}

export default Schedule