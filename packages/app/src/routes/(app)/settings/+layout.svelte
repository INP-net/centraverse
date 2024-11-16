<script lang="ts">
  import { browser } from '$app/environment';
  import { graphql, PendingValue } from '$houdini';
  import ButtonSecondary from '$lib/components/ButtonSecondary.svelte';
  import IconLydia from '$lib/components/IconLydia.svelte';
  import InputCheckbox from '$lib/components/InputCheckbox.svelte';
  import InputRadios from '$lib/components/InputRadios.svelte';
  import InputText from '$lib/components/InputText.svelte';
  import MaybeError from '$lib/components/MaybeError.svelte';
  import ModalOrDrawer from '$lib/components/ModalOrDrawer.svelte';
  import Submenu from '$lib/components/Submenu.svelte';
  import SubmenuItem from '$lib/components/SubmenuItem.svelte';
  import { formatDateTime } from '$lib/dates';
  import { debugging } from '$lib/debugging';
  import { loading, mapAllLoading } from '$lib/loading';
  import { mutateAndToast } from '$lib/mutations';
  import { refroute } from '$lib/navigation';
  import { route } from '$lib/ROUTES';
  import { getServerManifest, type ServerManifest } from '$lib/servmanifest';
  import { theme } from '$lib/theme';
  import IconDebug from '~icons/msl/code';
  import IconServerConfig from '~icons/msl/database-outline';
  import IconTrash from '~icons/msl/delete-outline';
  import IconPersonalData from '~icons/msl/download';
  import IconNotification from '~icons/msl/notifications-outline';
  import IconTheme from '~icons/msl/palette-outline';
  import IconSpecialOffer from '~icons/msl/percent';
  import IconProfile from '~icons/msl/person-outline';
  import type { LayoutData } from './$houdini';
  import ServerConfigurationModal from './ServerConfigurationModal.svelte';

  let openServerConfig: () => void;

  const UpdateLydiaPhone = graphql(`
    mutation UpdateLydiaPhone($lydiaPhone: String!) {
      saveLydiaPhoneNumber(phoneNumber: $lydiaPhone) {
        ...MutationErrors
        ... on MutationSaveLydiaPhoneNumberSuccess {
          data {
            lydiaPhone
          }
        }
      }
    }
  `);

  export let data: LayoutData;
  $: ({ LayoutSettings } = data);

  let serverManifest: ServerManifest | undefined;
  $: if (browser) serverManifest = getServerManifest();

  export let deleteAccountModal: () => void;
  // HINT: Don't forget to add an entry in packages/app/src/lib/navigation.ts for the top navbar's title and/or action buttons
</script>

<MaybeError result={$LayoutSettings} let:data={{ me, apiVersion }}>
  <div class="contents">
    <Submenu>
      <SubmenuItem icon={IconProfile} href={route('/users/[uid]/edit', loading(me.uid, ''))}>
        Profil
      </SubmenuItem>
      <SubmenuItem icon={IconTheme} subtext="Réglage par appareil">
        Thème
        <InputRadios
          slot="right"
          options={{
            auto: 'Suivre le système',
            dark: 'Sombre',
            light: 'Clair',
          }}
          bind:value={$theme.variant}
        />
      </SubmenuItem>
      <SubmenuItem icon={IconNotification} href={refroute('/notifications')}>
        Notifications
      </SubmenuItem>
      <SubmenuItem icon={IconLydia} subtext="N'apparaît pas sur le profil" label>
        Numéro de tel. pour Lydia

        <InputText
          label=""
          slot="right"
          inputmode="tel"
          value={loading(me.lydiaPhone, '')}
          on:blur={async ({ target }) => {
            if (!(target instanceof HTMLInputElement)) return;
            await mutateAndToast(
              UpdateLydiaPhone,
              { lydiaPhone: target.value },
              {
                error: 'Impossible de mettre à jour le num Lydia',
              },
            );
          }}
        />
      </SubmenuItem>
      <SubmenuItem icon={IconSpecialOffer} href={refroute('/claim-code')}>
        Réclamer un code de promotion
      </SubmenuItem>
      <SubmenuItem icon={IconPersonalData}>
        Mes données personnelles
        <ButtonSecondary
          slot="right"
          download="Mes données personnelles Churros {formatDateTime(new Date())}.json"
          href={refroute('GET /gdpr')}
        >
          Télécharger
        </ButtonSecondary>
      </SubmenuItem>
      <SubmenuItem clickable on:click={deleteAccountModal} icon={IconTrash}>
        Supprimer mon compte
      </SubmenuItem>
      <SubmenuItem icon={IconDebug} label>
        Mode debug
        <InputCheckbox slot="right" label="" bind:value={$debugging}></InputCheckbox>
      </SubmenuItem>
      <SubmenuItem
        on:click={openServerConfig}
        icon={IconServerConfig}
        clickable
        chevron
        subtext={mapAllLoading(
          [serverManifest ?? PendingValue, apiVersion],
          (manifest, version) => `Churros API v${version} à ${new URL(manifest.urls.api).host}`,
        )}
      >
        Choix du serveur
      </SubmenuItem>
    </Submenu>
    <ServerConfigurationModal bind:open={openServerConfig} />
    <ModalOrDrawer bind:open={deleteAccountModal}>
      <p>Veuillez contacter l'équipe administrative de votre AE pour supprimer votre compte.</p>
    </ModalOrDrawer>
  </div>
</MaybeError>

<style>
  .contents {
    padding: 0 1rem;
  }
</style>
