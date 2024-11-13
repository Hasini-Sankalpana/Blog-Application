import { Footer as FlowbiteFooter } from 'flowbite-react'; 
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsGithub, BsDribbble} from 'react-icons/bs'

const Footer = () => {
  return (
  <FlowbiteFooter container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Hasi's
        </span>
        Blog
      </Link> 
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                <FlowbiteFooter.Title title='About' />  
                <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href='https://wwww.100jsprojects.com' target='_blank' rel='noopener noreferer'>
                        100 JS Projects
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href='/about' target='_blank' rel='noopener noreferer' >
                        Hasi's Blog
                    </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
                </div>
                <div>
                <FlowbiteFooter.Title title='Follow Us' />  
                <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href='https://wwww.github.com/hasini-sankalpana' target='_blank' rel='noopener noreferer'>
                        Github
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href='#'>
                        Discord
                    </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
                </div>
                <div>
                <FlowbiteFooter.Title title='Legal' />  
                <FlowbiteFooter.LinkGroup col>
                    <FlowbiteFooter.Link href='#'>
                        Privacy Policy
                    </FlowbiteFooter.Link>
                    <FlowbiteFooter.Link href='#'>
                        Terms &amp; Conditions
                    </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
                </div>

            </div>
        </div>
        <FlowbiteFooter.Divider/>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
            <FlowbiteFooter.Copyright href='#' by="Hasi's blog"  year={new Date().getFullYear}/>
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <FlowbiteFooter.Icon href='#' icon={BsFacebook} />
                <FlowbiteFooter.Icon href='#' icon={BsInstagram} />
                <FlowbiteFooter.Icon href='#' icon={BsLinkedin} />
                <FlowbiteFooter.Icon href='https://wwww.github.com/hasini-sankalpana' icon={BsGithub} />
                <FlowbiteFooter.Icon href='#' icon={BsDribbble} />

            </div>
        </div>
    </div>
  </FlowbiteFooter>
  )
}

export default Footer