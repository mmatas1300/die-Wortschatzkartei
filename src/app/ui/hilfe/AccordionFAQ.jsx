import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

const AccordionFAQ = () => (
    <Accordion.Root
        className="bg-blue-card rounded-xl w-full p-7 m-auto"
        type="single"
        defaultValue=""
        collapsible
    >
        <div className='ms-6 text-lg'>FAQ</div>
        <AccordionItem value="item-1">
            <AccordionTrigger>What is &apos;die Wortschatzkartei&apos; ?</AccordionTrigger>
            <AccordionContent>&apos;die Wortschatzkartei&apos; is a web application designed to create your own vocabulary flashcards and learn German vocabulary with spaced repetition.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
            <AccordionTrigger>How can I get started?</AccordionTrigger>
            <AccordionContent>
            Create an account by clicking &apos;Anmelden&apos;, select the &apos;Registrieren&apos; button and enter your email and password. Once you are registered, you can log in using the &apos;Anmelden&apos; section of the form.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
            <AccordionTrigger>What do I do once I&apos;m logged in?</AccordionTrigger>
            <AccordionContent>
            Once you&apos;ve logged in, set up your account with your nickname (Spitzname) and choose whether you want to use your own cards or the ones loaded by default. You can change these settings whenever you want in the &apos;Mein Konto&apos; section.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
            <AccordionTrigger>How can I create my own cards?</AccordionTrigger>
            <AccordionContent>
            You can find the &apos;Neue Karte erstellen&apos; form in the &apos;Karteneditor&apos; section. In this form, you can choose the type of word you want to add. You can add nouns (Nomen), verbs (Verb), words that have variations for men and women (Gleichstellungsnomen), and any other category (Andere Wort).
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
            <AccordionTrigger>Where can I see my cards?</AccordionTrigger>
            <AccordionContent>
            You can find your cards sorted in the &apos;Wörterbuch&apos; section. In order to view your cards, it&apos;s necessary that you have previously configured your account to use your own cards. Otherwise, you will see the default cards.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
            <AccordionTrigger>How can I edit my cards?</AccordionTrigger>
            <AccordionContent>
            In the &apos;Karteneditor&apos; section, you will find the &apos;Karten verwalten&apos; form, where you can manage your cards. You can edit them, reset their progress, or delete them.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
            <AccordionTrigger>How can I study the cards?</AccordionTrigger>
            <AccordionContent>
            In the &apos;Üben&apos; section, you can start your daily practice. When a card is presented to you, you should remember its meaning and additional information. If you were able to recall it, click the &apos;Richtig&apos; button; otherwise, click &apos;Falsch&apos;. Remember that the cards you practice with depend on the settings established in the &apos;Mein Konto&apos; section.
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
            <AccordionTrigger>How can I enable integration with PONS?</AccordionTrigger>
            <AccordionContent>
                <ol className='list-decimal'>
                    <li>
                        Create a PONS account: Go to <a className='text-green-card underline' target="_blank" href='https://en.pons.com/translate'>PONS</a> and sign up.
                    </li>
                    <li>
                        Access the PONS API: Navigate to <a className='text-green-card underline' target="_blank" href='https://en.pons.com/p/online-dictionary/developers/api'>PONS API</a> and select &apos;API registration form&apos;.
                    </li>
                    <li>
                        Complete the registration: Click on &apos;Create your account&apos; and fill out the form.
                    </li>
                    <li>
                        Get your secret key: Once your account is created, select &apos;Show secret&apos; and copy the key displayed in &apos;secret&apos;.
                    </li>
                    <li>
                        Configure your account: In your account (Mein Konto), go to &apos;Kontoeinstellungen&apos; and paste the copied key into the &apos;Pons Secret&apos; field. Press the &apos;Fertig&apos; button to update your data.
                    </li>
                </ol>
            </AccordionContent>
        </AccordionItem>
    </Accordion.Root>
);

const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={classNames(
            'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        {children}
    </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={classNames(
                'group flex h-[45px] flex-1 cursor-default items-center justify-between bg-black-card px-5 text-[15px] leading-none outline-none',
                className
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <ChevronDownIcon
                className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
            />
        </Accordion.Trigger>
    </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={classNames(
            'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
            className
        )}
        {...props}
        ref={forwardedRef}
    >
        <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
));

AccordionItem.displayName = 'AccordionItem'
AccordionTrigger.displayName = 'AccordionTrigger'
AccordionContent.displayName = 'AccordionContent';

export default AccordionFAQ;