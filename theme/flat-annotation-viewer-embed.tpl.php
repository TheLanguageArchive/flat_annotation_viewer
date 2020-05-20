<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title;?></title>
</head>
<body>
<?php if (true === $accessible) : ?>
    <annotation-viewer url="<?php echo $url; ?>" show-timestamps="<?php echo $show_timestamps == 1 ? 'true' : 'false'; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>"></annotation-viewer>
<?php else : ?>
    This file is not accessible to you.
<?php endif; ?>

<script type="text/javascript" src="<?php echo $annotation_viewer_js; ?>"></script>
</body>
</html>
