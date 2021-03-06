// Antd dependencies
import { Row, Col } from 'antd'
import ProLayout, { MenuDataItem, Settings } from '@ant-design/pro-layout'

// Other dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Link } from 'umi'

// Local files
import RightContent from '@/components/GlobalHeader/RightContent'
import logoWide from '../assets/logo-wide.svg'
import logoSquare from '../assets/logo-square.svg'

export declare interface AppLayoutProps {
	breadcrumbNameMap: {
		[path: string]: MenuDataItem
	}
	route: {
		authority: string[]
	}
	settings: Settings
	dispatch: Dispatch
}
export type AppLayoutContext = { [K in 'location']: AppLayoutProps } & {
	breadcrumbNameMap: {
		[path: string]: MenuDataItem
	}
}

const AppLayout: React.FC<AppLayoutProps> = props => {
	const settings = useSelector((state: any) => state.settings)

	return (
		<ProLayout
			collapsedButtonRender={false}
			logo={
				<picture>
					<source media="(max-width: 768px)" srcSet={logoSquare}/>
					<source style={{ marginLeft: 15 }} media="(min-width: 767px)" srcSet={logoWide} />
					<img src={logoWide} />
				</picture>
			}
			menuHeaderRender={(logoDom): JSX.Element => (
				<Link to="/">
					{logoDom}
				</Link>
			)}
			menuItemRender={(menuItemProps, defaultDom): React.ReactNode => {
				if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
					return defaultDom
				}
				return <Link to={menuItemProps.path}>{defaultDom}</Link>
			}}

			itemRender={(route, routes, paths): JSX.Element => {
				const first = routes.indexOf(route) === 0
				return first ? (
					<Link to={paths.join('/')}>{route.breadcrumbName}</Link>
				) : (
					<span>{route.breadcrumbName}</span>
				)
			}}
			rightContentRender={(): JSX.Element => <RightContent />}
			{...props}
			{...settings}
		>
			<Row style={{ backgroundColor: 'transparent', justifyContent: 'center' }}>
				<Col xxl={16} xl={20} lg={22} md={22} sm={24}>
					{props.children}
				</Col>
			</Row>
		</ProLayout>
	)
}

export default AppLayout
